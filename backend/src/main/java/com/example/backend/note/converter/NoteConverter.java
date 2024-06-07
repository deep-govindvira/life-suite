package com.example.backend.note.converter;


import com.example.backend.note.database.Note;

public class NoteConverter {

    public com.example.backend.note.database.Note getDatabase(com.example.note.oas.model.Note note) {
        return com.example.backend.note.database.Note.builder()
            .id(note.getId())
            .title(note.getTitle())
            .description(note.getDescription())
            .color(note.getColor())
            .build();
    }

    public com.example.note.oas.model.Note getResponse(Note note) {
        return com.example.note.oas.model.Note.builder()
            .id(note.getId())
            .title(note.getTitle())
            .description(note.getDescription())
            .color(note.getColor())
            .build();
    }
}
