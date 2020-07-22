import  xlsx from "xlsx"
import Medicament from "./medicament.js"
import { exec } from "child_process"

const convert = (file)=>{
     var wb = xlsx.readFile(file, {
        cellDates: true
    })
    
    var Sheet = wb.Sheets

    var sheetName = wb.SheetNames
    sheetName.map((sheet)=>{
        const data = xlsx.utils.sheet_to_json(Sheet[sheet])
        data.map((item,idex)=>{
            var medicament = new Medicament({props: item});
            medicament.save()
          }) 
    })
    exec("./bash.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    }); 
}

export default convert