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
editMode: boolean = false;
itemId: number = -1;

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

    if (this.editMode == false) {
      this.service.addItem(this.inputTodo, -1);
      this.inputTodo = ''
    }
    else if (this.editMode == true) {
      this.service.addItem(this.inputTodo, this.itemId);
      this.inputTodo = ''
      this.itemId = -1;
    }

  }

  onDelete(itemId: any){
    this.service.deleteItem(itemId)
  }

  onEdit(item: number){
    this.editMode = true;
    this.inputTodo = this.todoList[item].content;
    this.itemId = item;
  }

}
