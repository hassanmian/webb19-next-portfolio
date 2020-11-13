import Head from 'next/head'
import Link from 'next/link'

function fetchMe() {
  return fetch("https://js-lessons-a0fc7.firebaseio.com/me.json")
}

function fetchProjectList() {
  return fetch("https://js-lessons-a0fc7.firebaseio.com/projects.json")
}

function fetchTechnologyList() {
  return fetch("https://js-lessons-a0fc7.firebaseio.com/technologies.json")
}

export default function Home(props) {
  const { projectListData, technologyListData } = props;
  const { name, about, welcomeMessage, contact, picture, cv, cvLinkText} = props.meData;
  return (
    <div>
      <Head>
        <title>{name} - {about}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Portfolio</h1>
      <p>{welcomeMessage} {name}</p>
      <img src={picture} />
      <p>
        <a href={`mailto:${contact.email}`}>{contact.emailLinkText}</a> <br/>
        <a target="_blank" href={contact.github}>{contact.githubLinkText}</a> <br/>
        <a target="_blank" href={contact.instagram}>{contact.instagramLinkText}</a> <br/>
        <a target="_blank" href={contact.linkedin}>{contact.linkedinLinkText}</a> <br/>
        <a href={`tel:${contact.phone}`}>{contact.phoneLinkText}</a>
      </p>
      <p>
        <a target="_blank" href={cv}>{cvLinkText}</a>
      </p>


      <h2>Projects</h2>
      <Link href="/projects">See all projects</Link>
      {Object.entries(projectListData).map((item, index) => {
        const projectName = item[0]
        const projectData = item[1]
        return (
          <p key={index}>
            <Link href={`/projects/${projectName}`}>{projectData.name}</Link>
          </p>
        )
      })}

      <h2>Technologies</h2>
      {Object.entries(technologyListData).map((item, index) => {
        const technologyData = item[1]
        return (
          <p key={index}>
            <a target="_blank" href={technologyData.link}>{technologyData.name}</a>
          </p>
        )
      })}
      
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetchMe()
  const meData = await data.json()

  const projectData = await fetchProjectList()
  const projectListData = await projectData.json()

  const technologyData = await fetchTechnologyList()
  const technologyListData = await technologyData.json()

  return {
    props: {
      meData,
      projectListData,
      technologyListData
    }
  }
}