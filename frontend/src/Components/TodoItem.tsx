import '../Scss/components.scss'

export interface ITodoItem {
  name: string,
  id: number
}

export interface TodoItemProps {
  itemInfo: ITodoItem,
  onDelete: (item: ITodoItem) => void
}

const TodoItem = (props: TodoItemProps): JSX.Element => {
  return (
    <span>
      <button onClick={() => { props.onDelete(props.itemInfo) }}>DONE</button>
      <p className="todoitem">{props.itemInfo.name}</p>
    </span >
  );
}

export default TodoItem;