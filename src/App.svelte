<script>
  import { onMount } from 'svelte'
  import orderBy from 'lodash/orderBy'
  import findIndex from 'lodash/findIndex'
  import Button from '@smui/button'

  import Add from './components/todo/Add.svelte'
  import List from './components/todo/List.svelte'
  import Item from './components/todo/Item.svelte'

  let allTodos = []
  let showCompleted = false

  onMount(async () => {
    const response = await fetch('/api/todos')
    const data = await response.json()
    allTodos = orderBy(data, ['updatedAt', 'desc'])
  })

  async function handleAddTodo(name) {
    const res = await fetch('/api/todos', {
      method: 'post',
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    allTodos = [data, ...allTodos]
  }

  async function handleCompleteTodo(todo) {
    try {
      const res = await fetch(`/api/todos/${todo.todoId}`, {
        method: 'patch',
        body: JSON.stringify({
          complete: todo.complete,
          name: todo.name,
        }),
      })
      const data = await res.json()
      const todoIndex = findIndex(allTodos, (x) => x.todoId === todo.todoId)
      allTodos[todoIndex] = data
    } catch (error) {}
  }

  async function handleDeleteTodo(todo) {
    try {
      await fetch(`/api/todos/${todo.todoId}`, { method: 'delete' })
      allTodos = allTodos.filter((x) => x.todoId !== todo.todoId)
    } catch (error) {}
  }

  $: todos = allTodos.filter((x) => !x.complete)
  $: completedTodos = allTodos.filter((x) => x.complete)
</script>

<main class="container mx-auto text-center p-8">
  <h1 class="mdc-typography--headline2 mb-8">Get things done</h1>

  <div class="flex flex-col mx-auto md:w-2/3">
    <Add onAddTodo={handleAddTodo} />
    <List
      items={todos}
      let:item
      class="border border-t-0 {!showCompleted && 'rounded-b'}">
      <Item
        {item}
        onCompleteTodo={handleCompleteTodo}
        onDeleteTodo={handleDeleteTodo} />
    </List>
    {#if showCompleted}
      <List items={completedTodos} let:item class="border rounded-b border-t-0">
        <Item
          {item}
          onCompleteTodo={handleCompleteTodo}
          onDeleteTodo={handleDeleteTodo} />
      </List>
    {/if}
    <div class="text-right mt-1">
      <Button
        on:click={() => (showCompleted = !showCompleted)}
        class="focus:outline-none">
        {showCompleted ? 'Hide' : 'Show'} completed
      </Button>
    </div>
  </div>
</main>
