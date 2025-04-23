

# webdev links

+ https://markllobrera.com/posts/eleventy-building-image-gallery-photoswipe/#a-small-example

+ https://www.geos.ed.ac.uk/~smudd/NMDM_Course/html/more_advanced_github.html

+ https://codepen.io/dirtystylus/project/editor/ZgePbo

+ https://darekkay.com/blog/photography-website/

+ https://dev.to/derrickreimer/how-to-use-webpack-in-an-eleventy-project-272

+ https://11ty.recipes/recipes/add-a-sitemap/

⢠⠊⣉⠒⠤⢀⡀          ⡐⢁⠴⢜⢄
 ⡎⢸  ⠉⠐⠢⢌⠑⢄    ⡸  ⡆    ⠣⠱⡀
 ⡇⢸        ⣀⠗  ⠉⠉⠁  ⠙⠢⠤⡀⢃⢱
 ⡇⠘⣄⢀⠔⠉                    ⠈⠁⠘⡄
 ⢇    ⠁                          ⠘⡄
 ⢸            ⢀⣀⣀⡀        ⢀⣀⣀⡀  ⢣
 ⡸        ⢴⣾⡿⠿⠽⠇        ⠘⠛⠛⠛  ⠈⢄
⠰⡁              ⢠⠒⠢⡀⠈⠒⠊  ❤ ⡠⢄  ⡘
 ⠱⣀          ⢀⠜    ⠇        ⢀⠔⠁  ⡏
⠑⠤⢄⣀⠔⠁    ⡜        ⠊⠁  ⢀⠜”


---
 # bookmarks

+ https://www.tofugu.com/learn-japanese/

+ https://www.ferryhalim.com/orisinal/

+ https://grimgrains.com/site/home.html

+ https://www.snifflebear.moe/p/welcome.html

+ https://dappervolk.com/

+ https://muffin.xdg.com/

+ https://petrapixel.neocities.org/resources/bookmarks

+ https://frills.dev/bookmarks/

+ https://crotovane.neocities.org/

# blog ideas

- ipod jailbreaking
- kindle jailbreaking DONE
- all my single use devices and their uses
- minecraft forever world

# Wishlist 

- https://www.ebay.com/itm/385719919058
- https://samoondoh.com/products/museum-bag-m-goat-black

# notes

``` 
6. Working with GitHub repositories on more than one computer
In this section we will explain the basics of working with a repository on more than one computer. The basic case is that you want to work on something from your work computer and from your home computer. The lesson assumes you have already set up a GitHub repository. If you haven’t, start here: Version control with git.

This section complements the always outstanding instructions at Software carpentry.

6.1. Giving other people commit privileges to your repository
On GitHub, anyone can grab your files and download them onto their computer. Not everyone, however, can make changes to your repositories. But what if you want to collaborate on a repository? You can, by changing the commit privileges on your repository.

Click here for instructions on how to add collaborators to your GitHub repository.

6.2. Pulling, fetching, merging and cloning
If you have made a repository, you should already be familiar with the git push command. This command tells git to “push” all your commits to a remote repository which is usually GitHub or Bitbucket.

But what if you have an up to date repository on GitHub and you want to start working on this repository on your home computer? For this, you will need to learn about the git commands pull, fetch, merge and clone.

We will discuss these commands below, but you can also read about them on GitHub help and at Software Carpentry collaboration lesson.

6.2.1. Cloning a repository
If you want to reproduce a repository on your home computer, the place to start is probably by using the clone command.

This command copies all the files in a repository to your computer, and begins tracking them in git. You do this by typing in:

git clone https://github.com/USERNAME/REPOSITORY.git
Where you need to update the USERNAME and REPOSITORY to the appropriate names.

6.2.1.1. If it is your repository
If the repository belongs to you, you can start committing changes on the new computer and then pushing them to master:

git push -u origin master
The origin is the name of the remote directory. If you use the clone command on your own repository the origin of the cloned repository will automatically be your github repository.

It is essential that if you clone a repository so that it is on two different computers, you use the pull command (see below) before you start working. Otherwise, you will put one of your repositories out of synch with the “master” repository and you will need to use the “merge” command, which can be rather tedious.

6.2.1.2. If the repository belongs to someone else
Say you’ve cloned a repository belonging to someone else. This will download all the files and initiate git tracking. You are free to commit changes on your local files. But what happens if you try to push?

The cloned repository will still point to the original github repository (https://github.com/USERNAME/REPOSITORY.git). Unless the owner of that repository has specifically given you commit permission, then you will not be able to commit to that repository.

6.2.2. Forking: cloning and tracking your own edits
Say you want to start editing someone else’s code, but you don’t have commit priviledges. What you can do is fork a repository.

Forking is not a command in git. It is something you do in GitHub. You can click here to read the details, but here is a brief primer on forking.

First, go the the GitHub repository you want to start working on.

Near the top right of the github page you will see a link for a fork. Click this link. This will set up a new repository in your account, with all the files from the original!

You still don’t have the files on your computer. You need to clone your forked repository. Do this with:

git clone https://github.com/MY_USERNAME/REPOSITORY.git
Note that this is similar to a clone command for a different person’s repository, but this time you use your username.

You can now make changes, commit them and push them to origin.

6.2.2.1. How do I keep my fork synched with the original repository?
You’ve forked a repository, but suppose the owner of the original repository is a super hacker and is updating their code all the time?

To make sure you keep up to date with the original, you need to tell git to add an “upstream” repository.

The “upstream” is not a command, it is a name, so if you wanted you could call it “parent” or something else, but most people seem to call it “upstream” by convention.

To add an “upstream” repository, you type (you need to be in the directory of your local copy of the repository):

git remote add upstream https://github.com/USERNAME/REPOSITORY.git
Where USERNAME is the username of the owner of the upstream repository, NOT your username.

You can check if the upstream and origin addresses are correct by typing:

git remote -v
Now you can keep the forked repository snyched by using the fetch command.

6.2.3. Fetching a repository
The fetch command grabs work without merging that work with the existing main branch of the code.

You can read about how fetch allows you to synch a fork ``by clicking here <https://help.github.com/articles/syncing-a-fork/>`_.

6.2.4. Merging a repository
If you use fetch, you will need to merge the changes with preexisting code. To do this you use the ‘’merge’’ command.

For more information, click here for instructions on merge, fetch and pull.

If you have a conflict in your files, you will need to resolve them. Read about conflict resolution here.

6.2.5. Pull: merging and fetching in one go¶
The git pull command is a combination of fetch and merge.
```

# 