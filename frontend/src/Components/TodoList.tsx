import TodoItem from "./TodoItem";

interface ITodoListProps {
  todoItems: Array<string>,
  onDelete: (index: number) => void
}

const TodoList = (props: ITodoListProps): JSX.Element => {
  return (
    <div>
      <ul>
        {props.todoItems.map((item, i) => {
          return <li key={i}>{TodoItem({ itemInfo: item, onDelete: () => { props.onDelete(i) } })}</li>
        })}
      </ul>
    </div>
  );
}

export default TodoList;