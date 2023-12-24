import { Octokit }  from "@octokit/rest";
import fetch from "node-fetch";

const args = process.argv

if (args.length < 3) {
    throw new Error('Missing version')
}

const buildEmbed = ({
    content,
    title,
    changeLog,
    downloadUrl
}) => {
    return JSON.stringify({
      "content": content,
      "embeds": [
        {
          type: "rich",
          title: title,
          description: "",
          color: 0xa205f1,
          fields: [
            {
                "name": `Download`,
                "value": downloadUrl
            },
            {
              "name": `Changes`,
              "value": changeLog
            }
          ],
          timestamp: new Date().toISOString(),
          image: {
            "url": `https://media1.tenor.com/m/MtHuaX9Gpj4AAAAd/forsen-forsenpls.gif`,
            "height": 0,
            "width": 0
          }
        }
      ]
    });
}

const run = async () => {
    const v = args[2]
    console.info('Generating changelog for version', v)
    const webhook = process.env.WEBHOOK_URL;
    if (!webhook) {
        throw new Error('Missing discord webhook env')
    }
    const owner = 'froggieapp';
    const repo = 'froggie';
    const octokit = new Octokit({ request: { fetch }});
    const releases = (await octokit.rest.repos.listReleases({
        owner,
        repo,
        per_page: 2
      })).data

    if (!releases || releases[0]?.tag_name !== v) {
        return
    }

    const tags = (await Promise.allSettled(releases.map(r => octokit.request('GET /repos/{owner}/{repo}/git/ref/tags/{tag_name}', {
        owner,
        repo,
        tag_name: r.tag_name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })))).map(p => p.value.data)

      const latestRef = tags[0]
      const prevRef = tags[1]

      if (!latestRef || !prevRef) throw new Error('Could not find git refs for the releases')

     const base = prevRef.object.sha;
     const head = latestRef.object.sha;
    const diff = (await octokit.rest.repos
    .compareCommitsWithBasehead({
        owner,
        repo,
        basehead: `${base}...${head}`,
    })).data
    
    if (!diff?.commits?.length) return;

    const changelogTitle = `New Release ${releases[0].tag_name}`
    let changelog = ''
    for (let i = 0; i < diff.commits.length; i += 1) {
        const c = diff.commits[i]
        changelog += `- [${c.sha.slice(0, 4)}](<${c.html_url}>) ${c.commit.message} by **${c.author.login}**\n`
    }

    await fetch(webhook, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: buildEmbed({
            content: '',
            title: changelogTitle,
            downloadUrl: releases[0].html_url,
            changeLog: changelog
        })
    })
} 

run()