import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { todoModel } from 'src/app/shared/todo.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private service: TodoServiceService) { }

inputTodo: any;

private mySubscription: Subscription;

todoList:  todoModel[] = [];


  ngOnInit(): void {
    this.todoList = this.service.getTodoArray();
    this.mySubscription = this.service.subject
      .subscribe(
        (myArrayData: todoModel[]) => {
          this.todoList = myArrayData
        }
      )
  }

  onAddItem(){
    this.service.addItem(this.inputTodo);
    this.inputTodo = ''
  }

  onDelete(itemId: any){
    this.service.deleteItem(itemId)
  }

}
