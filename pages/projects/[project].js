import React from 'react'

function fetchProject(name) {
  return fetch(`https://js-lessons-a0fc7.firebaseio.com/projects/${name}.json`)
}

export default function project(props) {
  const { projectData } = props
  return (
    <div>
      <h1>{projectData.name}</h1>
      <img src={projectData.image} />
      <p>{projectData.description}</p>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const projectName = ctx.params.project
  const data = await fetchProject(projectName)
  const projectData = await data.json()
  return {
    props: {
      projectData
    }
  }
}