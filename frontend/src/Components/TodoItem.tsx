
export interface TodoItemProps {
  handlePop: () => void
}

const TodoItem = (props: TodoItemProps): JSX.Element => {
  return (
    <div>
      <p>TODO ITEM</p>
      <button onClick={props.handlePop}>DONE</button>
    </div>
  );
}

export default TodoItem;