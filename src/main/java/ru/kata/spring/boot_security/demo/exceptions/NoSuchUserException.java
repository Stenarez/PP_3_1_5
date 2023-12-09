package ru.kata.spring.boot_security.demo.exceptions;

public class NoSuchUserException extends Throwable {
    public NoSuchUserException(String message) {
        super(message);
    }
}
