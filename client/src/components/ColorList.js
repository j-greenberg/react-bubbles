import React, { useState } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setUpdate }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [adding, setAdding] = useState(true);
  const [colorToAdd, setColorToAdd] = useState({color: '', code: { hex: ''} } );

  const editColor = color => {
    setAdding(false);
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`api/colors/${colorToEdit.id}`, {color: colorToEdit.color, code: { hex: colorToEdit.code.hex}, id: colorToEdit.id})
      .then(res => {
        console.log("Successfully edited! Response: ", res)
        setUpdate(res);
        setEditing(false);
      })
      .catch(err => {
        console.log("Did NOT change color! Error message: ", err)
      })
  };

  const deleteColor = color => {
    console.log(color.id)
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log("Color was successfully deleted! Response: ", res)
        setUpdate(res)
      })
      .catch(err => {
        console.log("Color was not deleted! Error message: ", err)
      })
  };

  const addColor = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/colors',  {color: colorToAdd.color, code: { hex: colorToAdd.code.hex}})
      .then(res => {
        console.log("New color successfully added! Response: ", res)
        setColorToAdd({ color: '', code: { hex: '' } })
        setUpdate(res)
      })
      .catch(err => {
        console.log("Color was NOT added! Error message: ", err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                    setAdding(true);
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}

        

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => {
              setEditing(false)
              setAdding(true)}
            }>cancel</button>
          </div>
        </form>
      )}
      </ul>


      {adding && (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
          </div>
        </form>
      )}
  
    {/* spacer goes here */}
      <div className="spacer"/>
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
