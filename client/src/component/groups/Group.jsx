import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useGlobalContext from "../../GlobalContext";
import Todo from "../todos/Todo";
import Editor from "../editor/Editor";
import useGroupsStyle from "../todos/styles/groups.styled";

export default function Group({ id, name, is_completed }) {
  const classes = useGroupsStyle();

  const { completed_todos, incomplete_todos } = useGlobalContext();
  const todos = completed_todos.concat(incomplete_todos);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Editor
            id={id}
            value={name}
            is_completed={is_completed}
            type="group"
            deleteTarget="group"
          />
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
          {todos.map((todo) => {
            if (todo.group_id !== id) return;
            return (
              <Todo
                key={todo._id}
                id={todo._id}
                task={todo.task}
                is_completed={todo.is_completed}
                type="group"
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
