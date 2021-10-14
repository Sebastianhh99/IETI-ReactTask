import axios from "axios"

export class ApiLookup{
    static axiosLookup(method,endpoint,callback,data){
        const headers={
            "Content-Type":"application/json"
        }
        axios({
            method:method,
            url:endpoint,
            headers:headers,
            data
        }).then(response=>{
            callback(response.data,response.status)
        }).catch((err)=>{
            callback({detail:"Error"},400)
            console.log(err)
        })
    }

    static login(callback,username,password){
        //this.axiosLookup("POST","",callback,{"username":username,"password":password})
        callback({token:"token"},200)
    }
}