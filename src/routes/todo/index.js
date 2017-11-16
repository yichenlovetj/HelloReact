import React from 'react';
import Layout from '../../components/Layout';
import Todo from './Todo';

const title = 'To-do List';

function action() {
  return {
    // chunks:['todo'],
    title,
    component: (
      <Layout>
        <Todo title={title} />
      </Layout>
    ),
  };
}

export default action;
