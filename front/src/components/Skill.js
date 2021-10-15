import React, { useState } from 'react'
import StarRating from './StarRating'

const Skill = ({ skill, stars, reps }) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const button = visible ? 'show less' : 'show more'

    const repoFilter = (rep, language) => {
        const repos = rep.filter(r => {
            const keys = Object.keys(r.lan).reduce((des, key) => {
                des[key.toLowerCase()] = r.lan[key]
                return des
            }, {})
            if (Object.keys(keys).length !== 0) {
                const keyCheck = Object.keys(keys).includes(language.toLowerCase())
                if (keyCheck) {
                    return r
                } else {
                    return null
                }
            } return null
        })
        return repos
    }

    const SkillValue = ({ value }) => {
        return <p>{value}</p>
    }

    //funtions that show repos
    const Repos = ({ repos, language }) => {
        const reposToShow = repoFilter(repos, language)
        return (
            <>
                <h4>My repos that use the language</h4>
                {reposToShow.length > 0 ? reposToShow.map((r) => {
                    return (
                        <a className="repoLink" key={r.repos.id} href={r.repos.svn_url} >{r.repos.name}</a>
                    )
                }) :
                    <h6>no repos</h6>
                }
            </>
        )

    }

    // Function to show my starred repos by language
    const Starred = ({ stars, language }) => {
        const reposToShow = repoFilter(stars, language)

        return (
            <>
                <h4>Starred repos that use the language</h4>
                {reposToShow.length > 0 ? reposToShow.map((r) => {
                    return (
                        <a className="repoLink" key={r.repos.id} href={r.repos.svn_url} >{r.repos.name}</a>
                    )
                }) :
                    <h6>no repos</h6>
                }
            </>
        )
    }

    return (
        <section className="flex-card">
            <header className="card-header"><h3>{skill.name}</h3><StarRating value={skill.value} /><button className="showhide" onClick={toggleVisibility}>{button}</button></header>

            {visible ?
                <section className="repo-info">
         
                    <Repos language={skill.name} repos={reps} />
                    <Starred language={skill.name} stars={stars} />
                </section> :
                <section className="repo-info hidden">
                    <Repos language={skill.name} repos={reps} />
                    <Starred language={skill.name} stars={stars} />
                </section>
            }

        </section>
    )

}
export default Skill