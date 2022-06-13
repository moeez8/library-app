const { models } = require("../config/database");

const copyApi = () => {
    const getAllCopies = (req, res) => {
        models.copy
            .findAll()
            .then((copies) => {
                res.send(copies);
            })
            .catch((err) => {
                res.status(400).send("Could Not Find Any Copies");
            });
    }

    const addNewCopy = (req, res) => {

        const { book_id, owner } = req.body;

        if (book_id == null) {
            res.status(400).json({ error: "Missing Property book_id" });
            return;
        }
        if (owner == null) {
            res.status(400).json({ error: "Missing Property owner" });
            return;
        }

        models.copy
            .create({
                book_id,
                owner,
            })
            .then((row) => res.send(row))
            .catch((err) => {
                res.status(400).send("Could Not Add A Copy");
            });
    };



    const getCopyByID = (req, res) => {
        models.copy
            .findByPk(parseInt(req.params.id))
            .then((row) => {
                if (row) {
                    res.send(row);
                } else {
                    res.status(400).json({ error: "Could Not Find A Copy" });
                }
            })
            .catch((err) => {
                res.status(400).send("Could Not Find A Copy");
            });
    }

    const getCopyWithdrawsByID = (req, res) => {
        models.copy
            .findByPk(parseInt(req.params.id), {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })
            .then((row) => {
                res.send(row.withdraws);
            })
            .catch((err) => {
                res.status(400).send("Could Not Find Copy");
            });
    }

    const checkinCopyByID = (req, res) => {
        models.copy
            .findByPk(parseInt(req.params.id), {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })
            .then((row) => {
                if (row) {
                    //Can Copy Be Checked Out?

                    const array = [...row.withdraws];

                    array.sort((a, b) => {
                        if (a.date_out < b.date_out) return 1;
                        return -1;
                    });

                    if (array[0] && !array[0].date_in) {
                        models.withdraw.findByPk(array[0].id).then((rowb) => {
                            rowb.update({ date_in: new Date() });
                            res.send(rowb);
                        });
                    } else {
                        res.status(400).send("Copy Could Not Be Checked In");
                    }
                } else {
                    res.status(400).json({ error: "Failed To Find Row" });
                }
            })
            .catch((err) => {
                res.status(400).json({ error: "Failed To Find Row", msg: err });
            });
    }


    const checkoutCopyByID = (req, res) => {
        models.copy
            .findByPk(parseInt(req.params.id), {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })
            .then((row) => {
                if (row) {
                    //Can Copy Be Checked Out?

                    const array = [...row.withdraws];

                    array.sort((a, b) => {
                        if (a.date_out < b.date_out) return 1;
                        return -1;
                    });

                    if (array[0]) {
                        if (array[0].date_in != null) {
                            models.withdraw
                                .create({
                                    copy_id: req.params.id,
                                    date_out: new Date(),
                                    user_name: "Dave",
                                })
                                .then(() => res.sendStatus(200))
                                .catch((err) => {
                                    console.log("Error: " + err);
                                    res.sendStatus(400);
                                });
                        } else {
                            res.status(400).send("Copy Could Not Be Checked Out");
                        }
                    } else {
                        models.withdraw
                            .create({
                                copy_id: req.params.id,
                                date_out: new Date(),
                                user_name: "Dave",
                            })
                            .then(() => res.sendStatus(200))
                            .catch((err) => {
                                console.log("Error: " + err);
                                res.status(400).send("Copy Could Not Be Checked In");
                            });
                    }
                } else {
                    res.status(400).json({ error: "Failed To Find Row", msg: err });
                }
            })
            .catch((err) => {
                res.status(400).send("Copy Not Found");
            });

    }

    const checkCopyStatus = (req, res) => {
        models.copy
            .findByPk(parseInt(req.params.id), {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })
            .then((row) => {
                if (row) {
                    if (row.withdraws.length === 0) {
                        res.json({ status: true });
                        return;
                    } else {
                        const withdraws = [...row.withdraws];

                        withdraws.sort((a, b) => {
                            if (a.date_out < b.date_out) return 1;
                            return -1;
                        });

                        if (withdraws[0].date_in === null) {
                            res.json({ status: false });
                        } else {
                            res.json({ status: true });
                        }
                    }
                } else {
                    res.status(400).json({ error: "Failed To Find Copy" });
                }
            })
            .catch((err) => {
                res.status(400).json({ error: "Failed To Send Request" });
            });
    }

    return {
        getAllCopies,
        addNewCopy,
        getCopyByID,
        getCopyWithdrawsByID,
        checkinCopyByID,
        checkoutCopyByID,
        checkCopyStatus
    };


};

module.exports = copyApi;

