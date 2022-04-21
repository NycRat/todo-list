import { ITodoItem } from "./TodoItem";
import TodoItem from "./TodoItem";

interface ITodoListProps {
  todoItems: Array<ITodoItem>,
  onDelete: (item: ITodoItem) => void
}

const TodoList = (props: ITodoListProps): JSX.Element => {
  return (
    <div>
      <ul>
        {props.todoItems.map((item, i) => {
          return <li key={i}>{TodoItem({ itemInfo: item, onDelete: props.onDelete })}</li>
        })}
      </ul>
    </div>
  );
}

export default TodoList;