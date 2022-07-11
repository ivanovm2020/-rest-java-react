package ru.ivanov.server.controller;

import java.util.Arrays;

// This is only test
public class TestIterable {
    private static Iterable<String> iterable;

    public static void main(String[] args) {

        iterable = Arrays.asList("Misa", "Regina");
        for (String node : iterable) {
            System.out.println(node);
        }
    }
}
