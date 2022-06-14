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

    return { AddNewCopy, GetAllCopies, GetCopyByID, GetCopyWithdrawsByID }

}

export default CopyService