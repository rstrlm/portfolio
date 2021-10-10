import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Skill from './Skill'
import skillService from '../services/skills'

const SkillList = ({ skills, stars, reps }) => {
    // console.log(skills, 'skilllist')
    return (
        <article>
            {skills.map(s => {
                return (
                        <Skill key={s.id} skill={s} reps={reps} stars={stars} />
                )
            }
            )}
        </article>
    )
}

const Skills = () => {
    // const skills = [   
    //             {
    //                 name: 'css',
    //                 id: 1,
    //                 value: 4
    //             },
    //             {
    //                 name: 'html',
    //                 id: 2,
    //                 value: 4
    //             },
    //             {
    //                 name: 'javascript',
    //                 id: 3,
    //                 value: 4
    //             },
    //             {
    //                 name: 'php',
    //                 id: 4,
    //                 value: 4
    //             },
    //             {
    //                 name: 'java',
    //                 id: 5,
    //                 value: 4
    //             }
    // ]
    const [skills, setSkills] = useState([])
    const [repos, setRepos] = useState([])
    const [starred, setStarred] = useState([])
    const [reps, setReps] = useState([])
    const [stars, setStars] = useState([])
    
    useEffect(() => {
        skillService
            .getAll()
            .then(res => {
                setSkills(res)
            })
}, []);

    useEffect(() => {
        axios.get('https://api.github.com/users/rstrlm/repos')
            .then(res => {
                // console.log(res.data)
                setRepos(res.data)
            })
            .catch(e => {
                console.log('error', e)
            })
    }, []);
    useEffect(() => {
        axios.get('https://api.github.com/users/rstrlm/starred')
            .then(res => {
                // console.log(res.data)
                setStarred(res.data)
            })
            .catch(e => {
                console.log('error', e)
            })
    }, []);

    const getData = async (url) => {
        const { data: language } = await axios.get(url)
        // console.log('get lan', language)
        return language
    }

    useEffect(() => {
        const handleStars = (star) => {
            setStars([...new Set([].concat(...stars, ...star))])
        }
        const handleRepos = (repo) => {
            setReps([...new Set([].concat(...reps, ...repo))]);
        }

        const getLanguage = async (arr, set) => {
            // console.log('get language', arr)
            const newArr = await Promise.all(arr.map(async (a) => {
                try {
                    const langauge = await getData(a.languages_url).then((res) => {
                        return res
                    })
                    return { repos: a, lan: langauge }
                } catch (err) {
                    console.log(err, 'error')
                }
            }))
            if (set) {
                handleStars(newArr)
            } else {
                handleRepos(newArr)
            }
        }
        if (starred.length > 1) {
            const set = true
            getLanguage(starred, set)
        }
        if (repos.length > 1) {
            const set = false
            getLanguage(repos, set)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [starred]);
    return (
        <>
            <SkillList stars={stars} skills={skills} reps={reps} />
        </>
    )
}

export default Skills