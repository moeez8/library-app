const { models } = require("../config/database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const CopyService = () => {

    const AddNewCopy = async (id: any, owner: string): Promise<any> => {
        const copy = await models.copy
            .create({
                book_id: id,
                owner: owner,
            })
        return copy
    }

    const GetAllCopies = async (): Promise<any> => {
        const copies = await models.copy
            .findAll();
        return copies
    }

    const GetCopyByID = async (id: any): Promise<any> => {
        const copy = models.copy
            .findByPk(id)
        return copy
    }

    const GetCopyWithdrawsByID = async (id: any): Promise<any> => {
        const withdraws = models.copy
            .findByPk(id, {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })
        return withdraws
    }

    const CheckinCopyByID = async (id: any): Promise<any> => {

        const copy = await models.copy
            .findByPk((id), {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })

        if (copy) {
            //Can Copy Be Checked In?
            const array = [...copy.withdraws];

            array.sort((a, b) => {
                if (a.date_out < b.date_out) return 1;
                return -1;
            });

            if (array[0] && !array[0].date_in) {
                models.withdraw.findByPk(array[0].id).then((rowb: any) => {
                    rowb.update({ date_in: new Date() });
                });
            }
        }
    }

    const CheckoutCopyByID = async (id: any): Promise<any> => {
        const copy = await models.copy
            .findByPk(id, {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })


        if (copy) {
            //Can Copy Be Checked Out?

            const array = [...copy.withdraws];

            array.sort((a, b) => {
                if (a.date_out < b.date_out) return 1;
                return -1;
            });

            if (array[0]) {
                if (array[0].date_in != null) {
                    const withdraw = await models.withdraw
                        .create({
                            copy_id: id,
                            date_out: new Date(),
                            user_name: "Dave",
                        })
                }
            } else {
                models.withdraw
                    .create({
                        copy_id: id,
                        date_out: new Date(),
                        user_name: "Dave",
                    })
            }
        }

    }

    const CheckCopyStatus = async (id: any): Promise<any> => {

        const copy = await models.copy
            .findByPk(id, {
                include: [{ model: models.withdraw, as: "withdraws" }],
            })

        if (copy) {
            if (copy.withdraws.length === 0) {
                return { status: true };
            } else {
                const withdraws = [...copy.withdraws];

                withdraws.sort((a, b) => {
                    if (a.date_out < b.date_out) return 1;
                    return -1;
                });

                if (withdraws[0].date_in === null) {
                    return { status: false };
                } else {
                    return { status: true };
                }
            }
        }
        return copy;
    }

    return { AddNewCopy, GetAllCopies, GetCopyByID, GetCopyWithdrawsByID, CheckinCopyByID, CheckoutCopyByID, CheckCopyStatus }

}

export default CopyService