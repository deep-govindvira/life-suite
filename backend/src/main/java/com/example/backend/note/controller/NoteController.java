package com.example.backend.note.controller;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.backend.note.converter.NoteConverter;
import com.example.note.oas.api.NoteApi;
import com.example.note.oas.model.Note;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;


@CrossOrigin
@Controller
@Slf4j
public class NoteController implements NoteApi {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Override
    public ResponseEntity<Note> add(Note note) {
        log.info("add note {}", note);
        NoteConverter noteConverter = new NoteConverter();
        com.example.backend.note.database.Note noteDatabase = noteConverter.getDatabase(note);
        noteDatabase.setId(UUID.randomUUID().toString());
        dynamoDBMapper.save(noteDatabase);
        return ResponseEntity.ok(note);
    }

    @Override
    public ResponseEntity<List<com.example.note.oas.model.Note>> get() {
        log.info("get noteList");
        List<Note> list = new LinkedList<>();
        NoteConverter noteConverter = new NoteConverter();
        for(com.example.backend.note.database.Note note :
            dynamoDBMapper.scan(com.example.backend.note.database.Note.class, new DynamoDBScanExpression())
        ) {
            list.add(noteConverter.getResponse(note));
        }
        return ResponseEntity.ok(list);
    }

    public ResponseEntity<com.example.note.oas.model.Note> getById(Note note) {
        log.info("get not by id {}", note);
        NoteConverter noteConverter = new NoteConverter();
        return ResponseEntity.ok(
            noteConverter.getResponse(
                dynamoDBMapper.load(
                    com.example.backend.note.database.Note.builder()
                        .id(note.getId())
                        .build()
                )
            )
        );
    }

    @Override
    public ResponseEntity<Note> remove(Note note) {
        log.info("remove note {}", note);
        NoteConverter noteConverter = new NoteConverter();
        dynamoDBMapper.delete(noteConverter.getDatabase(note));
        return ResponseEntity.ok(note);
    }

    @Override
    public ResponseEntity<Note> update(Note note) {
        log.info("update note {}", note);
        NoteConverter noteConverter = new NoteConverter();
        dynamoDBMapper.save(noteConverter.getDatabase(note));
        return ResponseEntity.ok(note);
    }
}
