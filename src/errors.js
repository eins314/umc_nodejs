export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
       this.data = data;
    }
}

export class UserServiceError extends Error{

    constructor(reason,data){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class ReviewAddError extends Error{
    constructor(reason,data){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class StoreAddError extends Error{
    constructor(reason,data){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class GetStoreMissionsError extends Error{
    constructor(reason,data){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}

export class GetUserChallengeError extends Error{
    constructor(reason,data){
        super(reason);
        this.reason=reason;
        this.data=data;
    }
}