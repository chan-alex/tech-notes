
git push --force and how to deal with it
------------------------------------------
https://evilmartians.com/chronicles/git-push---force-and-how-to-deal-with-it

--force considered harmful; understanding git  force-with-lease
-------------------------------------------------------------------
https://developer.atlassian.com/blog/2015/04/force-with-lease/



Git push --force is destructive because it unconditionally overwrites the remote repository with whatever you have locally, possibly overwriting any changes that a team member has pushed in the meantime. 

One of the most common causes of force pushes is when we're forced to rebase a branch.

1) We have a project with a feature branch that both Alice and Bob are going to work on. They both clone this repository and start work.
2) Alice initially completes her part of the feature, and pushes this up to the main repository. This is all well and good.
3) Bob also finishes his work, but before pushing it up he notices some changes had been merged into master. Wanting to keep a clean tree, he performs a rebase against the master branch. Of-course, when he goes to push this rebased branch it will be rejected. However not realising that Alice has already pushed her work, he performs a push --force. Unfortunately, this will erase all record of Alice's changes in the central repository.

In case what should Bob has done instead of git push --force?
  He should have git pull first and rebase.


How to fix git push --force issue?
----------------------------------


1) Best case scenario: someone else who is working on the same code pulled a recent version of the master just before you broke it. 
   Then all you have to do is to go into your team’s chat and ask that person to force push their recent changes.

2) Else You were the last person to push to master before the mistake.
   Do not close or clear your terminal. 
   
   In the output of git push --force command in your shell look for a line that resembles this one:

    + deadbeef...f00f00ba master -> master (forced update)
    The first group of symbols (which looks like a commit’s SHA prefix) is the key to the rescue. deadbeef is your last good commit to the master just before you inflicted damage.

    So all you need is to… force push (fighting fire with fire!) this commit back to the master branch, on top a bad one.

    $ git push --force origin deadbeef:master


3) master was changed by someone else before you messed up.
   This is github specific.
   just before you did git push --force someone had closed a bunch of pull requests, and the master now looks nothing like your local copy. 
   You can no longer do git push --force sha1:master as you do not have recent commits locally (and you can’t get them with git fetch because they do not belong to any branch anymore). 
   Still, keep calm and ask your teammates to stay off the remote for a while.

   We will benefit from the fact that GitHub does not remove unreachable commits immediately. Of course, you can not fetch them either, but there is a workaround.

   for the rest of the step see, https://evilmartians.com/chronicles/git-push---force-and-how-to-deal-with-it. Got pics.



How to protect against git push --force
---------------------------------------

1) GitHub and GitLab have a feature called “protected branches.” Mark master, develop, stable, or any other crucial branches as protected and no one will be allowed to force push into them. 
   It is always possible to temporarily “unprotect” a branch if you really need to overwrite history.

2) Instead of --force option, use --force-with-lease. It will halt the push operation if someone has pushed to the same branch while you were working on it (and haven’t pulled any changes).

3) Create aliases for commands that use git push --force to prevent destructive actions by accident:

      # ~/.gitconfig
      [alias]
          deploy = "!git push --force deis \"$(git rev-parse --abbrev-ref HEAD):master\""

4) Never do your experiments in the main branch of a repository! git checkout -b experiments is your best friend.




   
