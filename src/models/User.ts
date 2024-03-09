export type User = {
  username: string
  name: string | null
  mobile: string | null
  email: string
  image: string
  isUser: boolean
}

type BaseUser = {
  name: string | null
  email: string
  password: string
  username: string
  image: string
  mobile_country_code: string
  mobile: string | null
  role_id: string
  google_token: string
  google_id: string
  google_name: string
  email_verified_at: string
  mobile_verify_code: string
  mobile_attempts_left: string
  mobile_last_attempt_date: string
  mobile_verify_code_sent_at: string
}
