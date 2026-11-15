package com.example.solidprinciples.exception;

public class InvalidBonusException extends RuntimeException {

    public InvalidBonusException(String message) {
        super(message);
    }
}