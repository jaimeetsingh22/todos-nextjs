import { Suspense } from 'react';
import AddTodoForm from './AddTodoFom';
import Todos from './Todos';


const page = async () => {

  return (
    <div className='container m-auto'>
      <AddTodoForm />
      <Suspense fallback={<h2 className='container items-center justify-center flex'>Loading...</h2>}>
        <Todos/>
      </Suspense>
    </div>
  )
}

export default page