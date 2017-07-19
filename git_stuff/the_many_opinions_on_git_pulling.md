
There are suprising many many way to pull changes from a git repo


1)
I never "git pull".
better to fetch and rebase.

   git fetch
   git log ..@{u} # show me the new goodies
   # @{u} = "the upstream branch I'm currently tracking"
   # Let's take it
   git rebase

Alternatively:

    git fetch
    git log ..@{u} # show me the new goodies
    # Oh, they fixed the bug I'm working on 
    git reset --hard @{u}



2) 
I prefer to just not commit directly to master. Always branch, then pull on master and rebase your new branch back onto it.

Replies to this:
  you can
     git fetch
     git rebase origin/master


3) PSA: use 'git config --global --bool pull.rebase true' to rebase by default when you pull, your colleagues will thank you for that
	
      https://stackoverflow.com/questions/13846300/how-to-make-git-pull-use-rebase-by-default-for-all-my-repositories

   To which, some replied:

      Bad idea. You will just fuck up your merges by accident (TL;DR, merging different branch then accidentally rebasing via pull is bad and causes a mess)
      if you do need it for certain branch ,set it per-branch basis, like that:

        git config branch.stable.rebase true for branch named "stable"
   


4) Better to "git pull --rebase"

https://coderwall.com/p/7aymfa/please-oh-please-use-git-pull-rebase



5) git pull --rebase=interactive
Best on our team. We occasionally rewrite history and this saves us from duping commits.


5)
Rule of thumb: if your current branch is derived from another branch, rebase changes from that branch to the derived branch. 
That includes remote branches (local master is derived from remote/master). if your going the other way (want to get changes back from a derived branch to the original branch), merge.
If you've cloned a repo, rebase remote/master to your local master (git pull --rebase is shorthand for that).
If you've branched master to feature-foo locally, regularly rebase remote/master to your local master and rebase local master to your feature-foo branch. 
Especially if your branch is longer-lived.





References:
https://www.reddit.com/r/programming/comments/6nzgje/psa_use_git_config_global_bool_pullrebase_true_to/
