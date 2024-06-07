package com.example.backend.todo.converter;


import com.example.todo.oas.model.Todo;

public class TodoConverter {
    public com.example.backend.todo.database.Todo getDatabase(Todo todo) {
        return com.example.backend.todo.database.Todo.builder()
            .id(todo.getId())
            .name(todo.getName())
            .status(todo.getStatus())
            .build();
    }

    public Todo getResponse(com.example.backend.todo.database.Todo todo) {
        return Todo.builder()
            .id(todo.getId())
            .name(todo.getName())
            .status(todo.getStatus())
            .build();
    }
}
