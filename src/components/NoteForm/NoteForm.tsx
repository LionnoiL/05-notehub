import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { Button } from "antd";
import type { CreateNoteFormValues } from "../../types/note";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { QUERY_KEY_NOTES, TAGS } from "../../constants";
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onCloseModal: () => void;
}

const initialValues: CreateNoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long").notRequired(),
  tag: Yup.string().oneOf(TAGS).required("Tag is required"),
});

const NoteForm = ({ onCloseModal }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const handleCancel = () => {
    onCloseModal();
  };

  const mutation = useMutation<Note, Error, CreateNoteFormValues>({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_NOTES] });
      onCloseModal();
    },
  });

  const handleSubmit = (
    values: CreateNoteFormValues,
    actions: FormikHelpers<CreateNoteFormValues>,
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      className={css.form}
      validationSchema={NoteFormSchema}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" className={css.select} as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <Button className={css.cancelButton} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className={css.submitButton}
            disabled={false}
            htmlType="submit"
          >
            Create note
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
