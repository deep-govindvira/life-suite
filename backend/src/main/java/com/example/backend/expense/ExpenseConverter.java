package com.example.backend.expense;

import com.example.expense.oas.model.Expense;

public class ExpenseConverter {

    public com.example.backend.expense.Expense getDatabase(Expense expense) {
        return com.example.backend.expense.Expense.builder()
            .id(expense.getId())
            .title(expense.getTitle())
            .amount(expense.getAmount())
            .build();
    }

    public Expense getResponse(com.example.backend.expense.Expense expense) {
        return Expense.builder()
            .id(expense.getId())
            .title(expense.getTitle())
            .amount(expense.getAmount())
            .build();
    }
}
