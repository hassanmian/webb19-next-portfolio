import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

function fetchProjectList() {
  return fetch("https://js-lessons-a0fc7.firebaseio.com/projects.json")
}

export default function index(props) {
  const { projectListData } = props;
  return (
    <div>
      <Head>
        <title>My Projects</title>
      </Head>
      <h1>Projects</h1>
      {Object.entries(projectListData).map((item, index) => {
        const projectName = item[0]
        const projectData = item[1]
        return (
          <p key={index}>
            <Link href={`/projects/${projectName}`}>{projectData.name}</Link>
          </p>
        )
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const projectData = await fetchProjectList()
  const projectListData = await projectData.json()

  return {
    props: {
      projectListData
    }
  }
}