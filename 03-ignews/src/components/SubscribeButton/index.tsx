import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStipeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'

export function SubscribeButton() {
  const session = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session.data) {
      signIn('github')
    }

    if (session.data?.activeSubscription) {
      router.push('/posts')
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStipeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}