import { Adapter } from 'next-auth/adapters';
import { prisma } from '../prisma';
import { destroyCookie, parseCookies } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

export function PrismaAdapter(req: NextApiRequest, res: NextApiResponse): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req });

      if (!userIdOnCookies) {
        throw new Error('User Id not fownd on cookies');
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        }
      });

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/'
      });

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        image: prismaUser.image!,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        }
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.image!,
      };
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        }
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.image!,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          }
        },
        include: {
          user: true,
        }
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        image: user.image!,
      };
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        }
      });

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        image: prismaUser.image!,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token,
          accessToken: account.refresh_token,
          expiresAt: account.expires_at,
          tokenType: account.token_type,
          scope: account.scope,
          idToken: account.id_token,
          sessionState: account.session_state,
        }
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          userId,
          expires,
          sessionToken,
        }
      });

      return {
        userId,
        sessionToken,
        expires
      };
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          sessionToken: sessionToken,
        },
        include: {
          user: true,
        }
      });

      if (!session) {
        return null;
      }

      const { user } = session;

      return {
        session: {
          userId: session.userId,
          expires: session.expires,
          sessionToken: session.sessionToken,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          image: user.image!,
        }
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          sessionToken,
        },
        data: {
          expires,
          userId
        }
      });

      return {
        sessionToken: prismaSession.sessionToken,
        userId: prismaSession.userId,
        expires: prismaSession.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          sessionToken
        }
      });
    }
  };
}