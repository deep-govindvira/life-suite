package com.example.backend.expense;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.expense.oas.api.ExpenseApi;
import com.example.expense.oas.model.Expense;
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
public class ExpenseController implements ExpenseApi {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    ExpenseConverter expenseConverter = new ExpenseConverter();

    @Override
    public ResponseEntity<com.example.expense.oas.model.Expense> add(Expense expense) {
        log.info("add expense {}", expense);
        com.example.backend.expense.Expense expenseDatabase = expenseConverter.getDatabase(expense);
        expenseDatabase.setId(UUID.randomUUID().toString());
        dynamoDBMapper.save(expenseDatabase);
        return ResponseEntity.ok(expense);
    }

    @Override
    public ResponseEntity<List<Expense>> get() {
        log.info("get expense");
        List<Expense> list = new LinkedList<>();
        for(com.example.backend.expense.Expense expense :
            dynamoDBMapper.scan(com.example.backend.expense.Expense.class, new DynamoDBScanExpression()
            )) {
            list.add(expenseConverter.getResponse(expense));
        }
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<Expense> remove(Expense expense) {
        log.info("remove expense {}", expense);
        dynamoDBMapper.delete(expenseConverter.getDatabase(expense));
        return ResponseEntity.ok(expense);
    }

    @Override
    public ResponseEntity<Expense> update(Expense expense) {
        log.info("update expense {}", expense);
        dynamoDBMapper.save(expenseConverter.getDatabase(expense));
        return ResponseEntity.ok(expense);
    }
}
