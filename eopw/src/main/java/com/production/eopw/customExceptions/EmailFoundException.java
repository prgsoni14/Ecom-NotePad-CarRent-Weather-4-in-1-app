package com.production.eopw.customExceptions;

public class EmailFoundException extends Exception{
    public EmailFoundException(){

    }
    public EmailFoundException(String message)
    {
        super(message);
    }
}

