<?php

namespace App\Controller;

use App\Entity\Items;
use App\Entity\Subcategory;
use App\Repository\CategoriesRepository;
use App\Repository\ItemsRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class SubCategoriesController extends AbstractController
{
    #[Route('/api/subcategories', name: 'subcategories', methods: ['GET'])]
    public function getUserList(SerializerInterface $serializer, SubcategoryRepository $SubCategoriesRepository): JsonResponse
    {
        $SubCategoriesList = $SubCategoriesRepository->findAll();
        $jsonSubCategoriesList = $serializer->serialize($SubCategoriesList, 'json', ['groups' => 'getSubCategories']);
        return new JsonResponse($jsonSubCategoriesList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/subcategories/{id}', name: 'detailSubCategories', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, Subcategory $SubCategories): JsonResponse
    {
        $jsonUser = $serializer->serialize($SubCategories, 'json', ['groups' => 'getSubCategories']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, ['accept' => 'json'], true);
    }

    #[Route('/api/subcategories', name: "createSubCategories", methods: ['POST'])]
    public function createSubCategories(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher,
        CategoriesRepository $categoriesRepository
    ): JsonResponse {

        $SubCategories = $serializer->deserialize($request->getContent(), SubCategory::class, 'json');
        $content = $request->toArray();
        $category = $content['category'] ?? -1;
        $SubCategories->setCategory($categoriesRepository->find($category));
        $em->persist($SubCategories);
        $em->flush();
        $jsonItems = $serializer->serialize($SubCategories, 'json', ['groups' => 'getSubCategories']);
        $location = $urlGenerator->generate('detailItems', ['id' => $SubCategories->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonItems, Response::HTTP_CREATED, ["Location" => $location], true);
    }

    #[Route('/api/subcategories/{id}', name: "deleteSubCategories", methods: ['DELETE'])]
    public function deleteSubCategories(Subcategory $SubCategories, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($SubCategories);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/subcategories/{id}', name: "updateSubCategories", methods: ['PUT'])]
    public function updateSubCategorie(Subcategory $SubCategories, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, CategoriesRepository $categoriesRepository, ItemsRepository $itemsRepository, SubCategoriesController $subCategoriesController): JsonResponse
    {
        $updateSubCategories = $serializer->deserialize(
            $request->getContent(),
            Subcategory::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $SubCategories]
        );
        $req = $request->toArray();
        $id = $updateSubCategories->getId();
        $categoryId = $req["idCategory"] ?? $updateSubCategories->getCategory();
        $updateSubCategories->setCategory($categoriesRepository->find($categoryId));
        $items = $itemsRepository->findBy(["subcategory" => $id]);
        foreach ($items as $item) {
            $item->setCategory($categoriesRepository->find($categoryId));
            $em->persist($item);
            $em->flush();
        }
        $em->persist($updateSubCategories);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
