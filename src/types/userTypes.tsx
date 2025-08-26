export interface FormData{
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        username: string,
        acceptTerms:boolean

}

export interface FormErrors{
      
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        username?: string;
        acceptTerms?: string;
}   
