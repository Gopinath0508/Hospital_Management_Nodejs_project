const service = require('../services/userservice');
const { hashGenerate, hashValidator } = require("../helper/hashing");
const { tokenGenerator } = require("../helper/token");

const recadddata = async (req, res) => {
    const resdata = await service.addRecieptnist(req.body);
    res.send(resdata)
}
const docadddata = async (req, res) => {
    const docdata = await service.addDoctor(req.body)
    res.send(docdata)
}
const nuradddata = async (req, res) => {
    const nurdata = await service.addNurse(req.body)
    res.send(nurdata)
}
const patadddata = async (req, res) => {
    const patdata = await service.addPatent(req.body)
    res.send(patdata)
}
const adminadddata = async (req, res) => {
    // const hashPassword=await hashGenerate(req.body.password);
    const admindata = await service.addAdmin(req.body)
    res.send(admindata)
}
/////////////////////////hashing Password/////////////////////////////////
const adminadddatahash = async (req, res) => {
    const hashPassword = await hashGenerate(req.body.password);
    const admindata = await service.addAdminhash(req.body, hashPassword)
    res.send(admindata)
}
//////////////////////////////////////////////////////get//////////////////
const recgetdata = async (req, res) => {
    const resgdata = await service.getrec(req.params.id);
    res.send(resgdata);
}
const getadmindata = async (req, res) => {
    const data = await service.getadmin(req.params.body);
    res.send(data);
}
///////////////////////////////////////////signin////////////////////////////////
const Signin = async (req, res) => {
    const value = await service.adminSignin(req.body.userName);
    if (!value) {
        res.send("No user");
    } else {
        const checkUser = await hashValidator(req.body.password, value.password)
        if (!checkUser) {
            res.send("password is Invalid");
        }
        else {
            const token = await tokenGenerator(value.userName);
            // res.cookie("jwt",token);
            const data = {
                admin_Id: value.id,
                admin_Token: token,
                user: checkUser
            }
            res.send(data);
            const sendToken = await service.tokenData(data);
            return sendToken;
        }
    }
}
//////////////////////////////////signin/////////////////////////////////////////
//////////////////////////////////signOut/////////////////////////////////////////
const Signout=async(req,res)=>{
    const deletetoken=await service.deleteToken(req.params.id);
    console.log(req.params.id);
    res.send(deletetoken);
}

const getReceptionistData = async (req, res) => {
    const adm_Token = req.body.admin_Token;
    console.log(req.body);
    const checkId = await service.getTokenId(adm_Token); 
    if (checkId) {
        try {
            const data = await service.getallReceptionist();
            res.send(data);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    } else {
        res.send("No Token found");
    }
};

/////////////////////////////////////
const docnurdata = async (req, res) => {
    const resgdata = await service.getdocnur(req.params.id);
    res.send(resgdata);
}
const updatefileddata = async (req, res) => {
    const resgdata = await service.updatefileds(req.params.id, req.body);
    res.send(resgdata);
    res.status(200);
}
const group = async (req, res) => {
    const groupdata = await service.groupby();
    res.send(groupdata);

}

const projects = async (req, res) => {
    const proj = await service.project(req.params.id);
    res.send(proj);
}

const sorting = async (req, res) => {
    const sort = await service.sort();
    res.send(sort);
}
const lookpip = async (req, res) => {
    const lookp = await service.pip(req.params.id);
    res.send(lookp);
}
const compare = async (req, res) => {
    const value = await service.condition();
    res.send(value);
}
const getalldata = async (req, res) => {
    const allrecord = await service.ReceptionistAllData();
    res.send(allrecord);
}

////////////////////////////////////

const docgetdata = async (req, res) => {
    const resgdata = await service.getdoc(req.params.id);
    res.send(resgdata);
}
const doctergetdata = async (req, res) => {
    const resgdata = await service.getdocter();
    res.send(resgdata);
}

const nurgetdata = async (req, res) => {
    const resgdata = await service.getnur(req.params.id);
    res.send(resgdata);
}
const nursegetalldata = async (req, res) => {
    const resgdata = await service.getallnurse();
    res.send(resgdata);
}
const patientgetalldata = async (req, res) => {
    const resgdata = await service.getallpatient();
    res.send(resgdata);
}

const patgetdata = async (req, res) => {
    const resgdata = await service.getpat(req.params.id);
    res.send(resgdata);
}
//put
const recupdate = async (req, res) => {
    const update = await service.Updaterec(req.params.id, req.body);
    res.send(update);
    res.status(200);
}
const docupdate = async (req, res) => {
    const update = await service.Updatedoc(req.params.id, req.body);
    res.send(update);
    res.status(200);
}
const nurupdate = async (req, res) => {
    const update = await service.Updatenur(req.params.id, req.body);
    res.send(update);
    res.status(200);
}
const patupdate = async (req, res) => {
    const update = await service.Updatepat(req.params.id, req.body);
    res.send(update);
    res.status(200);
}
//delete
const recdelete = async (req, res) => {
    const deletedata = await service.deleterec(req.params.id, req.body);
    res.send(deletedata);
}
const docdelete = async (req, res) => {
    const deletedata = await service.deletedoc(req.params.id, req.body);
    res.send(deletedata);
}
const nurdelete = async (req, res) => {
    const deletedata = await service.deletenur(req.params.id, req.body);
    res.send(deletedata);
}
const patdelete = async (req, res) => {
    const deletedata = await service.deletepat(req.params.id, req.body);
    res.send(deletedata);
}

module.exports = {
    recadddata,
    docadddata,
    patadddata,
    nuradddata,
    adminadddata,
    adminadddatahash,
    recgetdata,
    docgetdata,
    nurgetdata,
    patgetdata,
    recupdate,
    docupdate,
    nurupdate,
    patupdate,
    recdelete,
    docdelete,
    nurdelete,
    patdelete,
    doctergetdata,
    nursegetalldata,
    getadmindata,
    getReceptionistData,

    Signin,
    Signout,

    docnurdata,
    updatefileddata,
    patientgetalldata,
    group,
    projects,
    sorting,
    lookpip,
    compare,
    getalldata

}