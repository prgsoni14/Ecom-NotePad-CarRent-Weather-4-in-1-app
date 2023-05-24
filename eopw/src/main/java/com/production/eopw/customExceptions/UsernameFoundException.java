package com.production.eopw.customExceptions;

public class UsernameFoundException extends Exception {
        public UsernameFoundException(){

        }
        public UsernameFoundException(String message){
                super(message);
        }
}
