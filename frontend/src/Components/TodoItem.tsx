export interface TodoItemProps {
  itemInfo: string,
  onDelete: () => void
}

const TodoItem = (props: TodoItemProps): JSX.Element => {
  return (
    <span>
      <button onClick={props.onDelete}>DONE</button>
      <p className="todoitem">{props.itemInfo}</p>
    </span >
  );
}

export default TodoItem;