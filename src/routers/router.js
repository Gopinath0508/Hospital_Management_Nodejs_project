const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const {authverify}=require("../helper/authverify")

router.post('/adddata/rec',usercontroller.recadddata);
router.post('/adddata/doc',usercontroller.docadddata);
router.post('/adddata/nur',usercontroller.nuradddata);
router.post('/adddata/pat',usercontroller.patadddata);
router.post('/adddatahash/Admin',usercontroller.adminadddatahash);
router.post('/adddata/Admin',usercontroller.adminadddata);

router.post('/login/Admin',usercontroller.Signin);
router.delete('/logout/Admin/:id',usercontroller.Signout);

router.get('/getdata/rec/:id',usercontroller.recgetdata);
router.get('/getdata/doc/:id',usercontroller.docgetdata);

router.get('/getdata/docter/',usercontroller.doctergetdata);
router.get('/getdata/nurse/',usercontroller.nursegetalldata);
router.get('/getdata/patient/',usercontroller.patientgetalldata);
router.get('/getdata/admin/',usercontroller.getadmindata);
router.get('/getdata/Receptionist/',usercontroller.getReceptionistData );
router.post('/getdata/Receptionist/',usercontroller.getReceptionistData );

router.get('/getdata/nur/:id',usercontroller.nurgetdata);
router.get('/getdata/pat/:id',usercontroller.patgetdata);
router.get('/getdata/docnur/:id',usercontroller.docnurdata);
router.get('/group/',usercontroller.group);
router.get('/sort/',usercontroller.sorting);
router.get('/comp/',usercontroller.compare);
router.get('/getalldata/',usercontroller.getalldata);
router.get('/Lookuppip/:id',usercontroller.lookpip);
router.get('/project/',usercontroller.projects);
router.put('/pudtdata/upfil/:id',usercontroller.updatefileddata);

router.put('/putdata/rec/:id',usercontroller.recupdate);
router.put('/putdata/doc/:id',usercontroller.docupdate);
router.put('/putdata/nur/:id',usercontroller.nurupdate);
router.put('/putdata/pat/:id',usercontroller.patupdate);

router.delete('/deldata/rec/:id',usercontroller.recdelete);
router.delete('/deldata/doc/:id',usercontroller.docdelete);
router.delete('/deldata/nur/:id',usercontroller.nurdelete);
router.delete('/deldata/pat/:id',usercontroller.patdelete);
module.exports=router;