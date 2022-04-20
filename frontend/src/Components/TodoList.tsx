import TodoItem from "./TodoItem";

interface IProps {
  todoItems: Array<typeof TodoItem>,
  handlePop: () => void
}

const TodoList = (props: IProps) => {
  return (
    <ol>
      {props.todoItems.map((item, i) => {
        return <li key={i}>{item({ handlePop: props.handlePop })}</li>
      })}
    </ol>
  );
}

export default TodoList;