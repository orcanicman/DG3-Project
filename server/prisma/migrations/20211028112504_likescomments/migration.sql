/*
  Warnings:

  - You are about to drop the `_UserLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserLikes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_UserPostLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserCommentLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserPostLikes_AB_unique" ON "_UserPostLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPostLikes_B_index" ON "_UserPostLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserCommentLikes_AB_unique" ON "_UserCommentLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCommentLikes_B_index" ON "_UserCommentLikes"("B");
