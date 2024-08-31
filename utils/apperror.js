

export class apperror extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
    }
}