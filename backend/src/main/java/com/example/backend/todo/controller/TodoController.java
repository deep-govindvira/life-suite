package com.example.backend.todo.controller;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.backend.todo.converter.TodoConverter;
import com.example.todo.oas.api.TodoApi;
import com.example.todo.oas.model.Todo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
@Slf4j
public class TodoController implements TodoApi {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Override
    public ResponseEntity<Todo> add(Todo todo) {
        log.info("add todo {}", todo);
        TodoConverter todoConverter = new TodoConverter();
        com.example.backend.todo.database.Todo todoDatabase = todoConverter.getDatabase(todo);
        todoDatabase.setId(UUID.randomUUID().toString());
        dynamoDBMapper.save(todoDatabase);
        return ResponseEntity.ok(todo);
    }

    @Override
    public ResponseEntity<List<Todo>> get() {
        TodoConverter todoConverter = new TodoConverter();
        List<Todo> list = new LinkedList<>();
        for(com.example.backend.todo.database.Todo todo :
            dynamoDBMapper.scan(com.example.backend.todo.database.Todo.class, new DynamoDBScanExpression())
        ) {
            list.add(todoConverter.getResponse(todo));
        }
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<Todo> update(Todo todo) {
        log.info("update todo {}", todo);
        TodoConverter todoConverter = new TodoConverter();
        dynamoDBMapper.save(todoConverter.getDatabase(todo));
        return ResponseEntity.ok(todo);
    }

    @Override
    public ResponseEntity<Todo> remove(Todo todo) {
        log.info("update todo {}", todo);
        TodoConverter todoConverter = new TodoConverter();
        dynamoDBMapper.delete(todoConverter.getDatabase(todo));
        return ResponseEntity.ok(todo);
    }
}
