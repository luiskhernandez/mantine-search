import React from 'react';
import { CloseButton } from '@mantine/core';

function ObjectList({ data = [], removeSelection }) {
  return (
    <div>
      <h2>Object List</h2>
      <ul>
        {data.map((object, index) => (
          <li key={index}>
            {Object.entries(object).map(([key, value]) => (
              <span key={key}>
                <strong> {key}: </strong> {value}
              </span>
            ))}
            <CloseButton onClick={() => removeSelection(object.teamId)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ObjectList;
