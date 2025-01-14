#!/usr/bin/env bash

set -e

source test/setup

use Test::More

clone-foo-and-bar

subrepo-clone-bar-into-foo

(
	cd "$OWNER/bar"
	add-new-files Bar2
	git push
) &>/dev/null || die

(
	cd "$OWNER/foo"
	echo ".*" >>.gitignore
	git add .gitignore
	git commit -m "Add gitignore"
	git push
) &>/dev/null || die

# Do the pull and check output:
{
	is "$(
		cd "$OWNER/foo"
		git subrepo pull bar
	)" \
		"Subrepo 'bar' pulled from '$UPSTREAM/bar' (master)." \
		'subrepo pull command output is correct'
}

# Test subrepo file content:
gitrepo=$OWNER/foo/bar/.gitrepo
{
	test-exists \
		"$OWNER/foo/bar/Bar2" \
		"$gitrepo"
}

# Test foo/bar/.gitrepo file contents:
{
	foo_pull_commit=$(
		cd "$OWNER/foo"
		git rev-parse HEAD^
	)
	bar_head_commit=$(
		cd "$OWNER/bar"
		git rev-parse HEAD
	)
	test-gitrepo-comment-block
	test-gitrepo-field "remote" "$UPSTREAM/bar"
	test-gitrepo-field "branch" "master"
	test-gitrepo-field "commit" "$bar_head_commit"
	test-gitrepo-field "parent" "$foo_pull_commit"
	test-gitrepo-field "cmdver" "$(git subrepo --version)"
}

done_testing

teardown
