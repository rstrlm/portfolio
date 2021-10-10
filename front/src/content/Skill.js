import React, { useState } from 'react'

const Skill = ({ skill, stars, reps }) => {

    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const button = visible ? 'show less' : 'show more'

    const Repos = ({ repos, name }) => {
        const reposToShow = repos.filter(r => {
            const keys = Object.keys(r.lan).reduce((des, key) => {
                // console.log(key, 'key')
                des[key.toLowerCase()] = r.lan[key]
                return des
            }, {})
            // console.log(keys, 'keys of a ', r)
            if (Object.keys(keys).length !== 0) {
                const keyCheck = Object.keys(keys).includes(name.toLowerCase())
                if (keyCheck) {
                    return r
                } else {
                    return null
                }
            } return null
        })
        // console.log(reposToShow)
        return (
            <>
                <h4>My repos that use the language</h4>
                {reposToShow.length > 0 ? reposToShow.map((r) => {
                    return (
                        <div key={r.repos.id}>
                            <a href={r.repos.svn_url} >{r.repos.name}</a>
                        </div>
                    )
                }) :
                    <h6>no repos</h6>
                }
            </>
        )

    }
    const Starred = ({ stars, name }) => {
        const reposToShow = stars.filter(r => {
            const keys = Object.keys(r.lan).reduce((des, key) => {
                // console.log(key, 'key')
                des[key.toLowerCase()] = r.lan[key]
                return des
            }, {})
            // console.log(keys, 'keys of a ', r)
            if (Object.keys(keys).length !== 0) {
                const keyCheck = Object.keys(keys).includes(name.toLowerCase())
                if (keyCheck) {
                    return r
                } else {
                    return null
                }
            } return null
        })
        // console.log(reposToShow)
        return (
            <>
                <h4>Starred repos that use the language</h4>
                {reposToShow.length > 0 ? reposToShow.map((r) => {
                    return (
                        <div key={r.repos.id}>
                            <a href={r.repos.svn_url} >{r.repos.name}</a>
                        </div>
                    )
                }) :
                    <h6>no repos</h6>
                }
            </>
        )
    }

    return (
        <section>
            <h3>{skill.name} {skill.value}</h3><button id='blog-showhide' onClick={toggleVisibility}>{button}</button>
            {visible ?
                <section className="repoInfo">
                    <Repos name={skill.name} repos={reps} />
                    <Starred name={skill.name} stars={stars} />
                </section> : null
            }

        </section>
    )

}
export default Skill