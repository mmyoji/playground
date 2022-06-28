#[test]
fn find_a_match() {
  let mut result = Vec::new();
  find_matches("lorem ipsum\njdolor sit amet", "lorem", &mut result);
  assert_eq!(result, b"lorem ipsum\n");
}
