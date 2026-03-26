import { Response } from "express";
import { sequelize } from "../../config/connection";
import generateRandomInstituteNumber from "../../services/generateRandomInsituteNumber";
import { IExtendedRequest } from "../../middleware/type";

class InstituteController {
  async createInstitute(req: IExtendedRequest, res: Response) {
    const {
      instituteName,
      institutePhoneNumber,
      instituteAddress,
      instituteEmail,
    } = req.body;
    const institutePanNo = req.body.institutePanNo || null;
    const instituteVatNo = req.body.instituteVatNo || null;
    console.log(req.user);
    if (
      !instituteName ||
      !institutePhoneNumber ||
      !instituteAddress ||
      !instituteEmail
    ) {
      return res.status(400).json({
        message:
          "Please provide instituteName,institutePhoneNumber,instituteAddress,instituteEmail,",
      });
    }
    const instituteNumber = generateRandomInstituteNumber();
    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      instituteAddress VARCHAR(255) NOT NULL,
      institutePanNo VARCHAR(255) ,
      instituteVatNO VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP


      )`);
    await sequelize.query(
      `INSERT INTO institute_${instituteNumber} (instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNo,
          instituteVatNo,
        ],
      },
    );
    res.status(200).json({
      message: "Institute created successfully",
    });
  }
}

const instituteC = new InstituteController();
export default instituteC;
