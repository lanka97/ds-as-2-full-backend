const govEmp = require('../model/govModel');

govEmp.check = function (req, res) {

    govEmp.findOne({
        nic: req.params.nic
    }).then(emp => {
        if (emp) {
            console.log('here');
            res.status(200).json({ message: "govEmp" });
        } else {
            res.status(200).json({ message: "not govEmp" });
        }
    }).catch(err => {
        res.status(500).json({ message: "err" });
    })

}

govEmp.add = function (req, res) {
    const gov = new govEmp({
        empName: "kasun premasiri",
        nic: '576845214V'
    });

    gov.save().then(res => {
        res.status(200).json({ message: "added" });
    }).catch(err => {
        res.status(500).json({ message: "err" });
    });
}

module.exports = govEmp;